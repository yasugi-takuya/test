all: testall

LOCKFILE=/tmp/up.run
PULL=missing

testall:
	for i in tests/*.py; do \
	  uv run python $$i; \
	done

test:
	uv run python $(FILE)

up: $(LOCKFILE)

down:
	docker compose -p test down --rmi local --remove-orphans -v -t 1
	make clean

$(LOCKFILE):
	docker compose -p test -f compose.yml -f compose_test.yml up --pull $(PULL) --quiet-pull -d | tee $(LOCKFILE)
	sleep 5
	@echo "Waiting for db to be ready..."
	sh -c "while ! docker exec --env-file=./env.txt $$(docker compose -p test ps -q db) /usr/local/bin/healthcheck.sh; do sleep 1; done"
	@echo "コンテナの停止は必要に応じて実行してください(make down)"

clean:
	rm -f $(LOCKFILE)


testall_in_docker: up
	docker compose -p test exec -w /workspaces web make testall
	@[ -n "$(DOWN)" ] && make down

test_in_docker: up
	docker compose -p test exec -w /workspaces web make test FILE=$(FILE)
	@[ -n "$(DOWN)" ] && make down



