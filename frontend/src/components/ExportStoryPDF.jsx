import React from "react";
import jsPDF from "jspdf";

export default function ExportStoryPDF({ story }) {
  // Hàm loại bỏ dấu tiếng Việt
  const removeAccents = (str) => {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const handleExport = () => {
    if (!story || story.trim() === "") {
      alert("Chua co truyen de xuat ");
      return;
    }

    try {
      const button = document.querySelector('button');
      const originalText = button?.innerHTML || "📜 Xuat truyen ra PDF";

      if (button) {
        button.innerHTML = "🔄 Dang tao PDF...";
        button.disabled = true;
      }

      // Tạo PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Loại bỏ dấu toàn bộ nội dung
      const cleanStory = removeAccents(story);

      // Cài đặt font
      pdf.setFont("times");
      pdf.setTextColor(0, 0, 0);

      // Cài đặt trang
      const margin = {
        top: 18,
        right: 20,
        bottom: 25,
        left: 20
      };

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pageWidth - margin.left - margin.right;

      let currentY = margin.top;
      const lineHeight = 5.5;
      const paragraphGap = 3;

      // Tiêu đề - không dấu
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Your Story", pageWidth / 2, currentY, { align: "center" });

      currentY += 10;

      // Đường kẻ trang trí
      pdf.setDrawColor(150, 150, 150);
      pdf.line(margin.left, currentY, pageWidth - margin.right, currentY);
      currentY += 12;

      // Nội dung - không dấu
      pdf.setFont("times", "normal");
      pdf.setFontSize(11);

      // Xử lý từng đoạn
      const paragraphs = cleanStory.split('\n').filter(p => p.trim() !== '');

      paragraphs.forEach((paragraph, index) => {
        // Thêm khoảng cách trước đoạn (trừ đoạn đầu)
        if (index > 0) {
          currentY += paragraphGap;
        }

        // Thụt lề đầu dòng cho đoạn đầu
        const firstLineIndent = index === 0 ? 10 : 0;

        // Chia đoạn thành các dòng
        const lines = pdf.splitTextToSize(paragraph, contentWidth - firstLineIndent);

        // Kiểm tra không gian cho cả đoạn
        const paragraphHeight = lines.length * lineHeight;
        if (currentY + paragraphHeight > pageHeight - margin.bottom) {
          pdf.addPage();
          currentY = margin.top;
          pdf.setFont("times", "normal");
          pdf.setFontSize(11);
        }

        // Vẽ từng dòng
        lines.forEach((line, lineIndex) => {
          // Kiểm tra từng dòng
          if (currentY > pageHeight - margin.bottom) {
            pdf.addPage();
            currentY = margin.top;
            pdf.setFont("times", "normal");
            pdf.setFontSize(11);
          }

          // Thụt lề cho dòng đầu
          const indent = (lineIndex === 0) ? firstLineIndent : 0;
          const xPos = margin.left + indent;

          // Căn đều hai bên (justify) - QUAN TRỌNG: tạo văn bản đẹp
          const isLastLine = lineIndex === lines.length - 1;
          const align = isLastLine ? "left" : "justify"; // Dòng cuối căn trái, các dòng khác căn đều

          pdf.text(line, xPos, currentY, {
            maxWidth: contentWidth - indent,
            align: align // Căn đều hai bên cho đẹp
          });

          currentY += lineHeight;
        });
      });

      // Đánh số trang - không dấu
      const totalPages = pdf.getNumberOfPages();
      pdf.setFont("times", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        const pageText = `Page ${i} / ${totalPages}`;
        pdf.text(pageText, pageWidth / 2, pageHeight - 10, { align: "center" });

        const dateText = `Created at: ${new Date().toLocaleDateString('vi-VN')}`;
        pdf.text(dateText, margin.left, pageHeight - 10);
      }

      pdf.save("yourstory.pdf");

      // Khôi phục button
      if (button) {
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
        }, 500);
      }

    } catch (error) {
      console.error("Loi:", error);
      alert("Loi xuat PDF!");

      const button = document.querySelector('button');
      if (button) {
        button.innerHTML = "📜 Xuat truyen ra PDF";
        button.disabled = false;
      }
    }
  };


  return (
    <>
      {/* Nút xuất PDF */ }
      <button
        onClick={ handleExport }
        className="cursor-pointer mr-4 bg-gradient-to-r from-yellow-800 to-yellow-600 text-white px-4 py-2 rounded-md hover:from-yellow-900 hover:to-yellow-700 transition-colors duration-200"
      >
        📜 Xuất truyện ra PDF
      </button>
    </>
  );
}
