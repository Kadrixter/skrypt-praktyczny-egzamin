(function () {
    const cleanText = str => str.replace(/\s+/g, " ").trim();
    const stripNumber = str => cleanText(str).replace(/^\d+\.\s*/, "");
  
    const btnMark = document.createElement("button");
    btnMark.textContent = "✅ Dodaj kropki";
    btnMark.style.cssText = "position:fixed;top:10px;left:10px;z-index:9999;padding:8px 12px;font-size:14px;border-radius:6px;background:#fff;border:2px solid #000;cursor:pointer";
  
    const btnClear = document.createElement("button");
    btnClear.textContent = "🧹 Wyczyść";
    btnClear.style.cssText = "position:fixed;top:50px;left:10px;z-index:9999;padding:8px 12px;font-size:14px;border-radius:6px;background:#fff;border:2px solid #000;cursor:pointer";
  
    document.body.appendChild(btnMark);
    document.body.appendChild(btnClear);
  
    btnMark.onclick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = () => {
        const reader = new FileReader();
        reader.onload = () => {
          const data = JSON.parse(reader.result);
          const questions = document.querySelectorAll("div.question");
  
          questions.forEach(q => {
            const titleEl = q.querySelector(".title");
            if (!titleEl) return;
            const pageQuestion = stripNumber(titleEl.textContent);
  
            const match = data.find(entry => stripNumber(entry.question) === pageQuestion);
            if (!match || !match.correct) return;
  
            const correct = match.correct.toLowerCase();
  
            q.querySelectorAll("label").forEach(label => {
              const strong = label.querySelector("strong");
              if (!strong) return;
  
              const letter = cleanText(strong.textContent).match(/^([A-Da-d])\./)?.[1]?.toLowerCase();
              if (letter === correct) {
                const textNode = strong.nextSibling;
                if (textNode && textNode.nodeType === Node.TEXT_NODE && !textNode.textContent.trim().endsWith(".")) {
                  textNode.textContent = textNode.textContent.trim() + ".";
                  label.classList.add("__dot_added");
                }
              }
            });
          });
  
          alert("✅ Dodano kropki do poprawnych odpowiedzi.");
        };
        reader.readAsText(input.files[0]);
      };
      input.click();
    };
  
    btnClear.onclick = () => {
      document.querySelectorAll("label.__dot_added").forEach(label => {
        const strong = label.querySelector("strong");
        const textNode = strong?.nextSibling;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.textContent = textNode.textContent.replace(/\.\s*$/, "").trim() + " ";
        }
        label.classList.remove("__dot_added");
      });
  
      btnMark.remove();
      btnClear.remove();
      alert("🧹 Usunięto kropki i przyciski.");
    };
  })();
  