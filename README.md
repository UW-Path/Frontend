# Frontend

## Project setup

```
npm ci
```

### Compiles and hot-reloads for development

Start the catalog-backed API from the Backend repository on port 8000, then run:

```
VUE_APP_BACKEND_URL=http://127.0.0.1:8000 \
NODE_OPTIONS=--openssl-legacy-provider \
npm run serve -- --host 127.0.0.1 --port 8080
```

Open <http://127.0.0.1:8080>. The OpenSSL option keeps this legacy Webpack
version usable on current Node.js releases.

The plan health experiment is off by default. Append `?planHealth=on` to enable
it or `?planHealth=off` to disable it. The selected state persists in local
storage, so subsequent page loads keep the same variant without the query
parameter. A deployment can default the experiment on with
`VUE_APP_PLAN_HEALTH_EXPERIMENT=on`; an explicit query parameter still wins.

In a Conductor workspace, the `frontend` run command performs the same setup on
the workspace's allocated port. Override `VUE_APP_BACKEND_URL` if the API is not
running on port 8000.

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
