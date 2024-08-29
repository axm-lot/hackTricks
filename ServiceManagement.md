# Managing Services on Different Init Systems

This guide explains how to manage services on systems using `SysVinit` or `Upstart` as their init system.

## For Systems Using SysVinit

If your system uses `SysVinit`, you can manage services with the `service` command:

### List All Services:
```bash
service --status-all
```
### Start a Service:
```bash
sudo service <service_name> start
```
### Stop a Service:
```bash
sudo service <service_name> stop
```
### Check the Status of a Service:
```bash
sudo service <service_name> status
```
## For Systems Using Upstart
If your system uses Upstart, you can manage services with the initctl command:

### List All Services:
```bash
initctl list
```
### Start a Service:
```bash
sudo initctl start <service_name>
```
### Stop a Service:
```bash
sudo initctl stop <service_name>
```
### Restart a Service:
```bash
sudo initctl restart <service_name>
```
### Check the Status of a Service:
```bash
sudo initctl status <service_name>
```
## Determine the Init System
If you're unsure which init system your distribution is using, you can check with the following command:
```bash
ps -p 1 -o comm=
```
*If* it returns systemd, your system uses systemd.
*If* it returns init, it uses SysVinit.
*If* it returns initctl, it uses Upstart.

