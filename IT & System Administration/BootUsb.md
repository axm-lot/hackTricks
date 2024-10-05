# Boot a USB Drive with the `dd` Command 🚀

## Step 1: List Connected Devices
To list all connected drives, use the following command:

```bash
lsblk
```

This will help you identify the correct USB drive.

## Step 2: Locate the ISO Image File
Ensure you know the location of the `.iso` image file, which will serve as the **input file** (`if`).

## Step 3: Write the ISO Image to the USB Drive
To write the ISO image to the USB drive, use the `dd` command as follows:

```bash
sudo dd if=/path/to/input_file.iso of=/dev/sdX status=progress
```

- Replace `/path/to/input_file.iso` with the actual path to your ISO file.
- Replace `/dev/sdX` with the correct USB device name you identified from Step 1 (e.g., `/dev/sdb`).
- The `status=progress` option will show you the progress of the operation.

> **⚠️Warning:** Be sure to specify the correct USB drive (`/dev/sdX`) as `of=`. Using the wrong drive could overwrite important data on your system.