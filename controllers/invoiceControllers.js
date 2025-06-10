import puppeteer from "puppeteer";
import invoice from "../models/Invoice.js";
// import Invoice from "../models/Invoice";

export async function getInvoice(req, res) {
  try {
    const invoices = await invoice.findOne({}).sort({ date: -1 });
    console.log(invoices);

    if (!invoices) {
      console.log("No invoice found");
      return res.status(404).json({ message: "No invoice found" });
    }
    res.status(200).json(invoices);
  } catch (error) {
    console.log("Internal Server Error", error.message);
    res.status(500).json({ message: "Error fetching invoices" });
  }
}


export async function generateInvoicePDF(req, res) {
  try {
    const { id } = req.params;
    const invoiceData = await invoice.findById(id);
    if (!invoiceData) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const previewUrl = `http://localhost:5000/invoice/preview/${id}`;
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '10mm', right: '10mm' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoiceData.invoiceNumber}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);

  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
}


export async function createInvoice(req, res) {
  try {
    const {
      // slNo,
      // shopName,
      // contactNumber,
      // shopAddress,
      customerName,
      materialCost,
      labourCost,
      customerPhone,
      date,
      // items,
      // tax = 0,
      totalAmount,
      // due = 0,
    } = req.body;

    // Basic input validation
    // if (
    //   !shopName ||
    //   !shopAddress ||
    //   !contactNumber ||
    //   !customerName ||
    //   !items ||
    //   !totalAmount
    // ) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }

    // if (!Array.isArray(items) || items.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invoice must have at least one item." });
    // }

    // Optional: Generate a unique invoice number


    let invoiceNumber;
    let isUnique = false;

    while (!isUnique) {
      const randomNum = Math.floor(10000 + Math.random() * 90000).toString();
      const existing = await invoice.findOne({ invoiceNumber: randomNum });
      if (!existing) {
        invoiceNumber = randomNum;
        isUnique = true;
      }
    }

    const newInvoice = new invoice({
      // slNo,
      invoiceNumber,
      // shopName,
      // contactNumber,
      materialCost,
      labourCost,
      // shopAddress,
      customerName,
      customerPhone,
      date,
      // items,
      // tax,
      totalAmount,
      // due,
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      message: "Invoice created successfully.",
      invoice: savedInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
export const updateInvoice = (req, res) => {
  res.status(200).send("fetch");
};
export const deleteInvoice = (req, res) => {
  res.status(200).send("fetch");
};
