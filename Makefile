
TESTS = test/*.js
REPORTER = spec

#
# Tests
# 

test: test-node test-browser 

test-node: 
	@printf "\n  ==> [Node.js]"
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter $(REPORTER) \
		$(TESTS)

test-browser: build
	@printf "\n  ==> [Phantom.Js]"
	@./node_modules/.bin/mocha-phantomjs \
		--R ${REPORTER} \
		./test/browser/index.html

test-cov: lib-cov
	@type_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter html-cov \
		$(TESTS) \
		> coverage.html

test-travisci: test-node test-browser lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@type_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter mocha-lcov-reporter \
		$(TESTS) \
		| ./node_modules/coveralls/bin/coveralls.js

#
# Components
# 

build: components lib/*
	@./node_modules/.bin/component-build --dev

components: component.json
	@./node_modules/.bin/component-install --dev

#
# Coverage
# 

lib-cov:
	@rm -rf lib-cov
	@./node_modules/.bin/jscoverage lib lib-cov

#
# Clean up
# 

clean: clean-components clean-cov

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf lib-cov
	@rm -f coverage.html


.PHONY: clean clean-components clean-cov test test-cov test-node test-browser lib-cov
