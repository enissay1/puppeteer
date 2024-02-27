 dependencies :docker
 -------------------------change de path oh pdf.js of path in yur machine and execute this command line-------------------------
 docker run -it --cap-add=SYS_ADMIN -v "${PWD}:/home/app" --rm ghcr.io/puppeteer/puppeteer:latest node -e "$(Get-Content 'C:\Users\Yassine\OneDrive\Bureau\puppeteer\puppeteer\pdf.js' -Raw)"
 ----------------------------------------------------------------------------------------------------------------------------------

