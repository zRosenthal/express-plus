To automatically compile and update changes you will need to open a terminal and run:
```
gulp watch
```
Then in another terminal run:
```
docker-compose build
docker-compose up
```

After you build it once you will not have to  build agian.

NOTE: if docker-compose up errors out the first time (cold start) simply ctrl-c and run docker-compose up agian.
