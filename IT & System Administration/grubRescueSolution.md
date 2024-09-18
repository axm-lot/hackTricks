If your Linux system boots into **GRUB rescue mode**, <br> `grub rescue >` <br> it's usually due to a broken or missing GRUB configuration. To fix it, you can:

1. Type `ls` to list partitions.
2. Identify your Linux partition: `ls (hd0,msdos1)` (check each until you find the correct one).
3. Set root: `set root=(hd0,msdos1)`.
4. Load GRUB: `insmod normal`.
5. Boot normally: `normal`.

After booting, reinstall GRUB to avoid future issues with commands like `sudo update-grub`.