# Installation

Install on Linux the wakeonlan program. This is a perl script to wake up computers using magic packets. To make this work, you still need to enable WOL in the BIOS of the target computer.

```sh
sudo apt-get install wakeonlan
```

## Send WOL package

The script wakeonlan sends the magic WOL packages via UDP. Use -i with the local broadcast address to limit the scope. 

```sh
wakeonlan -i 192.168.0.255 94:d6:91:28:30:71
```

## Debug

Capture WOL packages on the target computer to see if they are received.

```sh
 nc -l -u -p 9
 ```
 
 
