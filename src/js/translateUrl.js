export function TransLate() {
    const lang = document.documentElement.lang;
    const urlPath = window.location.pathname;
    console.log(urlPath)
    const btn = document.querySelector('.aaog-translate-btn');
    const transformPath = (path) => {
        if(path === '/') {
            return 'indexeng.html';
        }
        if(lang === 'es') {
            const pathSplit = path.split('.');
            return `${pathSplit[0]}eng.${pathSplit[1]}`;
        } else {
            const pathSplit = path.split('eng.');
            return `${pathSplit[0]}.${pathSplit[1]}`;
        }
    };

    const checkLang = () => {
        const newPath = transformPath(urlPath);
        btn.href = newPath;
    };
    checkLang()
}