# JS Benchmark

JS Backend benchmark.

## Running

Start the service on the 1st terminal: 

```bash
docker-compose up node-http
```

Start the benchmark on the 2nd, eg: running a get, with concurrency=8, and 1000 reps:

```bash
siege -c 8 -r 1000 http://0.0.0.0:3000/
```

## Results


| Endpoint | Runtime | Router | Concurrency | Requests | Success | txn / s | Longest |
| -------- | ------- | ------ | ----------- | -------- | ------- | ------- | ------- |
| GET /    | Node    | express| 8           | 8000     | 100%    | 1789.71 | 0.03    |
| GET /    | Node    | express| 8           | 79995    | 99.99 % |  560.46 | 19.54   |

TBD

