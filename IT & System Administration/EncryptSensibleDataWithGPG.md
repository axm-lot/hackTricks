# Encrypt Sensitive Data with GPG 🔐

## Step 1: Encrypt the File
To encrypt a sensitive file, use the following command:

```bash
gpg -c sensibleData
```

- The `-c` option tells GPG to use symmetric encryption (password-based).

## Step 2: Encrypted File Created 🎉
After running the command, you'll have an encrypted file named `sensibleData.gpg`.

## Step 3: Decrypt the File 🔓
To decrypt the file and restore its original content, use:

```bash
gpg -d sensibleData.gpg
```

- You'll be prompted to enter the password used during encryption.
