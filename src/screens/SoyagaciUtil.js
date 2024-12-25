export const generateSoyAgaciHTML = (kus, soyAgaci) => {
    let html = `<h1>${kus.ad} Soy Ağacı</h1>`;
   const recursiveHTML = (kuş, level = 0) => {
       let indent = '&nbsp;'.repeat(level * 4);
       html += `<p key="${level}-${kuş.kunye_no}-${Date.now()}-${Math.random()}">
          ${indent}<strong>${kuş.ad}</strong>`;
        if (kuş.anne_adi) html += ` Annesi: ${kuş.anne_adi}`;
       if (kuş.baba_adi) html += ` Babası: ${kuş.baba_adi}</p>`;
        if (soyAgaci && soyAgaci[kuş.kunye_no]) {
            const parents = soyAgaci[kuş.kunye_no];
          if (parents.anne) {
                recursiveHTML(parents.anne, level + 1);
          }
          if (parents.baba) {
              recursiveHTML(parents.baba, level + 1);
            }
            if (parents.children && parents.children.length > 0) {
                html += `<div style="margin-left: ${indent.length * 10}px">Kardeşler</div>`;
                html += parents.children.map((child, index) => {
                 return `<div key="${level}-${child.kunye_no}-${index}-${Date.now()}-${Math.random()}">` + recursiveHTML(child, level + 1) +`</div>`
                 });
            }
        }
    };
    recursiveHTML(kus, 0);
   return html;
};