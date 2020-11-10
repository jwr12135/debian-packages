#! /bin/sh
dpkg-scanpackages -m .  | gzip -c > ./debian/Packages.gz