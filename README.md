# Debian Packages

## Getting Started

To add gpg key, run the following:
```
sudo wget -O - https://raw.githubusercontent.com/jwr12135/debian-packages/main/debian/public.gpg.key | sudo apt-key add -
```

To add repository, run the following:
```
sudo apt-add-repository 'deb https://raw.githubusercontent.com/jwr12135/debian-packages/main/debian stable main'
```
