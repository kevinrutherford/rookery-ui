SRC_DIR := ./app
DIST_DIR := build
MK_COMPILED := .mk-compiled
MK_LINTED := .mk-linted
SOURCES := $(shell find $(SRC_DIR) -type f)

.PHONY: all ci-* clean clobber dev prod watch-*

all: $(MK_COMPILED) $(MK_LINTED)

# Software development - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev: node_modules server.mjs
	npx remix dev -c "node server.mjs"

watch-compiler: node_modules
	npx tsc --watch

$(MK_COMPILED): $(SOURCES) node_modules tsconfig.json
	npx tsc --noEmit
	touch $@

$(MK_LINTED): $(SOURCES) node_modules .eslintrc.json
	npx eslint --ext .js,.ts,.tsx $(SRC_DIR)
	@touch $@

# CI pipeline - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ci-test: clean $(MK_COMPILED) $(MK_LINTED)

# Production build - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(DIST_DIR): node_modules $(MK_COMPILED)
	npx remix build

# Artefacts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node_modules: package.json
	npm install
	@touch $@

# Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean:
	rm -f .mk-*

clobber: clean
	rm -rf ./$(DIST_DIR)
	rm -rf node_modules

