### Generating a secure pepper for hashing password

```bash
head -c 32 /dev/urandom | base64
```

### Generating a secure `JWT_TOKEN`

```bash
openssl rand -base64 32
```
