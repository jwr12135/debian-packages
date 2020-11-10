#! /bin/sh
cd debian
dpkg-scanpackages -m .  | gzip -9c > ./Packages.gz