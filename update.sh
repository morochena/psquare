#!/bin/bash

VERSION=$(cat ./.version)
docker build -t morochena/psquare:$VERSION . && docker push morochena/psquare:$VERSION
cloudron update --app=psquare --image=morochena/psquare:$VERSION