# Local Development Notes

## disable caching in browser
browser (index.html):
```
  <!-- disables browser cache on not only this index file, but scripts and images as well -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
```
## Apache server

    sudo  chcon -t httpd_sys_content_t . images/* dist/*

BROWSER:  https://osaka/littlejs01/

## Node browser-sync server

    sudo firewall-cmd --add-port 3000-3001/tcp
    npm i browser-sync
    npx browser-sync start --server --files '*.html', '*.js'

BROWSER:  http://192.168.254.234:3000/
