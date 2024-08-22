DEPCRUISE_CONFIG := .dependency-cruiser.cjs
DEV_SERVER_DIR := build
IMAGE := kevinrutherford/rookery-ui
IMAGE_VERSION := $(shell git describe --tags)
SRC_DIR := ./app

SOURCES := $(shell find $(SRC_DIR) -type f)

MK_COMPILED := .mk-compiled
MK_IMAGE := .mk-image
MK_LINTED := .mk-linted

depcruise := npx depcruise --config $(DEPCRUISE_CONFIG)

.PHONY: all ci-* clean clobber dev prod watch-*

all: $(MK_COMPILED) $(MK_LINTED)

# Software development - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev: node_modules
	npx remix dev

watch-compiler: node_modules
	npx tsc --watch

$(MK_COMPILED): $(SOURCES) node_modules tsconfig.json
	npx tsc --noEmit
	touch $@

$(MK_LINTED): node_modules .eslintrc.cjs $(SOURCES)
	npx eslint --ext .js,.ts,.tsx $(SRC_DIR)
	$(depcruise) $(SRC_DIR)
	@touch $@

check-unused:
	npx ts-unused-exports tsconfig.json --silent --ignoreFiles='tailwind'

# CI pipeline - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ci-test: clean $(MK_COMPILED) $(MK_LINTED)

# Production build - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(MK_IMAGE): $(SOURCES) prod.Dockerfile
	docker build -f prod.Dockerfile --tag $(IMAGE) .
	@touch $@

preview: $(MK_IMAGE)
	docker run -p 44001:3000 -it --rm $(IMAGE)

release: $(MK_IMAGE) git-status-clean
	docker tag $(IMAGE):latest $(IMAGE):$(IMAGE_VERSION)
	docker push $(IMAGE):$(IMAGE_VERSION)
	docker push $(IMAGE):latest
	git tag $(IMAGE_VERSION)

git-status-clean:
	@test -z "$$(git status --porcelain)"

# Artefacts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node_modules: package.json .nvmrc
	npm install
	@touch $@

# Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean:
	rm -f $(MK_COMPILED) $(MK_LINTED)
	rm -rf ./$(DEV_SERVER_DIR)

clobber: clean
	rm -f $(MK_IMAGE)
	rm -rf node_modules

