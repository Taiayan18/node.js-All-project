import book from "../data/books.js"

export const addbook = async (req, res) => {
  try {
    const { id, title, author, price } = req.body;

    if (!id || !title || !author || !price) {
      return res.status(400).json({
        status: false,
        message: "Fill all details",
      });
    }

    const newbook = new book({ id, title, author, price });
    await newbook.save();
    return res.status(201).json({
      status: true,
      message: "Book Succesfully Added",
      data: newbook,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

export const deletebook = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await book.findOneAndDelete({ id });

    if (!data) {
      return res.status(401).json({
        status: false,
        message: "Data Is Not Found",
      });
    }

    res.status(201).json({
      status: true,
      message: "Delete Book Succesfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const Update = async (req, res) => {
  try {
    const { id, title, author, price } = req.body;
    const data = await book.findOneAndUpdate({id},{title,author,price})

 

       if (!data) {
      return res.status(401).json({
        status: false,
        message: "Data Is Not Found",
      });
    }

    res.status(201).json({
      status:true,
      message:"Update Succesfully",
      data:data
    })

    if (!id || !title || !author || !price) {
      return res.status(400).json({
        status: false,
        message: "Fill all details",
      });
    }

  } catch (err) {
    console.log(err);
  }
};
