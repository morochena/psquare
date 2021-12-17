#!/bin/bash

VERSION=$(cat ./.version)

sed -i 's/"version":.*/"version": "'$VERSION'",/' CloudronManifest.json

docker build -t morochena/psquare:$VERSION . && docker push morochena/psquare:$VERSION
cloudron update --app=psquare --image=morochena/psquare:$VERSION