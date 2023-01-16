### Generating a secure pepper for hashing password
```bash
head -c 32 /dev/urandom | base64
```
