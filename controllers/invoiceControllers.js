import invoice from "../models/Invoice.js";
// import Invoice from "../models/Invoice";

export async function getInvoice(req, res){
    try {
        const invoices = await invoice.findOne({}).sort({ date: -1 });
            console.log(invoices);

        if(!invoices) {
            console.log("No invoice found");
            return res.status(404).json({ message: "No invoice found" });
        }
        res.status(200).json(invoices);
        
    } catch (error) {
        console.log("Internal Server Error",error.message)
        res.status(500).json({ message: "Error fetching invoices"  });
    }
}
export async function createInvoice(req, res) {
  try {
    const {
      shopName,
      contactNumber,
      shopAddress,
      customerName,
      customerPhone,
      date,
      items,
      tax = 0,
      totalAmount,
      due = 0
    } = req.body;

    // Basic input validation
    if (!shopName || !shopAddress || !contactNumber || !customerName || !items || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invoice must have at least one item." });
    }

    // Optional: Generate a unique invoice number
    const invoiceNumber = `${Date.now()}-${Math.floor(Math.random() * 10)}`;

    const newInvoice = new invoice({
      invoiceNumber,
      shopName,
      contactNumber,
      shopAddress,
      customerName,
      customerPhone,
      date,
      items,
      tax,
      totalAmount,
      due
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      message: "Invoice created successfully.",
      invoice: savedInvoice
    });

  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
export const updateInvoice = (req, res) => {
res.status(200).send("fetch")
}
export const deleteInvoice = (req, res) => {
res.status(200).send("fetch")
}