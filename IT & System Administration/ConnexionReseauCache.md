# Configure and Connect to a Hidden Wi-Fi Network with nmcli

This guide provides step-by-step instructions to set up and connect to a hidden Wi-Fi network using the `nmcli` command-line tool on Linux. Follow these steps carefully to ensure a successful connection.

## Prerequisites
- Ensure `nmcli` is installed (part of NetworkManager).
- Verify the Wi-Fi interface name (e.g., `wlan0`) using `nmcli device`.
- Have the SSID, password, and (optionally) BSSID of the target network ready.

## Steps

### 1. Create a Wi-Fi Connection Profile
Create a new connection profile for the hidden Wi-Fi network.

```bash
nmcli connection add type wifi ifname wlan0 con-name Standard-hidden ssid "hiddenWifiName"
```

- **Explanation**: This command creates a connection profile named `Standard-hidden` for the SSID `hiddenWifiName` on the `wlan0` interface.

### 2. Configure WPA2-PSK Security
Set up the connection to use WPA2-PSK security with the network password.

```bash
nmcli connection modify Standard-hidden wifi-sec.key-mgmt wpa-psk
nmcli connection modify Standard-hidden wifi-sec.psk "Passwdks@"
```

- **Explanation**: The first command sets the security protocol to WPA2-PSK. The second specifies the password (`Passwdks@`) for the network. Replace `Passwdks@` with the actual network password.

### 3. Mark the Network as Hidden
Indicate that the target Wi-Fi network is hidden (not broadcasting its SSID).

```bash
nmcli connection modify Standard-hidden wifi.hidden yes
```

- **Explanation**: This setting ensures `nmcli` actively scans for the hidden SSID during connection attempts.

### 4. (Optional) Specify the BSSID
If the network’s BSSID is known, bind the connection to a specific access point.

```bash
nmcli connection modify Standard-hidden wifi.bssid 36:C4:AF:46:86:60
```

- **Explanation**: This step is optional and useful when multiple access points share the same SSID. Replace `36:C4:AF:46:86:60` with the actual BSSID, if known.

### 5. Connect to the Network
Activate the connection to join the hidden Wi-Fi network.

```bash
nmcli connection up Standard-hidden
```

- **Explanation**: This command initiates the connection to the configured network.

## Troubleshooting
- **Verify Interface**: Confirm the correct interface name with `nmcli device`.
- **Check Connection Status**: Use `nmcli connection show` to view active connections.
- **Debug Issues**: Inspect logs with `journalctl -u NetworkManager` if the connection fails.
- **Password Accuracy**: Ensure the password matches the network’s requirements.
- **Network Availability**: Verify the hidden network is in range and operational.

## Notes
- Replace `wlan0` with your actual Wi-Fi interface name if different.
- Use the correct SSID and password for your network.
- The BSSID step is optional and can be skipped if not needed.
