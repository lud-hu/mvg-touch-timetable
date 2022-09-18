# Cloud Functions

## Install depenendcies

```shell
pip3 install -r requirements.txt
pip3 install -r requirements-test.txt
```

## Run function locally

```shell
functions-framework --target=autocomplete --debug --port 9001
functions-framework --target=get_route --debug --port 9002
```

## Deploy

```shell
gcloud functions deploy autocomplete --runtime python310 --trigger-http --allow-unauthenticated --region europe-west3
gcloud functions describe autocomplete --region europe-west3
gcloud functions deploy get_route --runtime python310 --trigger-http --allow-unauthenticated --region europe-west3
gcloud functions describe get_route --region europe-west3
```
