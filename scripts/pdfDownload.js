import { jsPDF } from "jspdf";
    var doc = new jsPDF();

    $('#cmd').click(function () {
        doc.fromHTML($('#post-content').html(), 15, 15, {
            'width': 170});
        doc.save('download.pdf');
    });