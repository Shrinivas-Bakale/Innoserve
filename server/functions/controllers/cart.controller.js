const { db } = require("../firebase.js");
const { doc, getDoc, updateDoc } = require("firebase/firestore");

exports.addToCart = async (req, res) => {
  try {
    const { userid } = req.params;
    const { serviceId, quantity } = req.body; // { serviceId: "abc123", quantity: 1 }

    console.log("Adding item to cart for user:", userid);

    if (!userid || typeof userid !== "string") {
      console.error("Invalid userid:", userid);
      return res.status(400).send({ error: "Invalid userid" });
    }

    if (!serviceId || quantity <= 0) {
      console.error("Invalid serviceId or quantity:", { serviceId, quantity });
      return res.status(400).send({ error: "Invalid serviceId or quantity" });
    }

    // Reference to the user's cart
    const cartRef = db.collection("carts").doc(userid);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      // If no cart exists, create one
      console.log("Creating new cart for user:", userid);
      await cartRef.set({
        cartItems: [{ serviceId, quantity }],
        userId: userid, // Add userId to make queries easier
        lastUpdated: new Date().toISOString(),
      });
    } else {
      const cartData = cartDoc.data();
      const existingItemIndex = cartData.cartItems.findIndex(
        (item) => item.serviceId === serviceId
      );

      if (existingItemIndex >= 0) {
        // Update quantity if the item already exists
        cartData.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new service to cart
        cartData.cartItems.push({ serviceId, quantity });
      }

      await cartRef.update({
        cartItems: cartData.cartItems,
        lastUpdated: new Date().toISOString(),
      });
    }

    res.status(200).send({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .send({ error: "Failed to add item to cart", details: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { userid } = req.params;

    // Validate userid
    if (!userid || typeof userid !== "string") {
      console.error("Invalid or missing userid:", userid);
      return res.status(400).send({ error: "Invalid or missing userid" });
    }

    console.log("Fetching cart items for user:", userid);
    const cartRef = db.collection("carts").doc(userid);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      console.log("Cart not found for user:", userid);
      return res.status(200).send([]); // Return empty array instead of 404
    }

    const cartData = cartDoc.data();

    if (
      !cartData.cartItems ||
      !Array.isArray(cartData.cartItems) ||
      cartData.cartItems.length === 0
    ) {
      console.log("Cart is empty for user:", userid);
      return res.status(200).send([]);
    }

    // Filter and validate cartItems
    const servicePromises = cartData.cartItems
      .filter((item) => item.serviceId && typeof item.serviceId === "string")
      .map((item) => db.collection("services").doc(item.serviceId).get());

    const serviceDocs = await Promise.all(servicePromises);

    const cartWithDetails = cartData.cartItems
      .map((item, index) => {
        const serviceDoc = serviceDocs[index];
        if (!serviceDoc.exists) {
          console.warn(`Service with ID ${item.serviceId} not found.`);
          return null; // Handle missing service gracefully
        }
        const service = serviceDoc.data();
        return {
          id: item.serviceId,
          ...service,
          quantity: item.quantity,
        };
      })
      .filter((item) => item !== null); // Remove invalid entries

    res.status(200).send(cartWithDetails);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .send({ error: "Failed to fetch cart", details: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userid, serviceid } = req.params;
  console.log(userid, serviceid);
  try {
    // Use v8 SDK style like the other functions
    const cartRef = db.collection("carts").doc(userid);
    console.log(cartRef);

    // Fetch the current cart document
    const cartDoc = await cartRef.get();
    console.log(cartDoc);

    if (!cartDoc.exists) {
      // Note: no parentheses for v8 SDK
      return res.status(404).send({ error: "Cart not found" });
    }

    // Get the current cartItems array
    const cartData = cartDoc.data();
    const updatedCartItems = cartData.cartItems.filter(
      (item) => item.serviceId !== serviceid
    );

    // Update the cartItems field in Firestore
    await cartRef.update({
      cartItems: updatedCartItems,
      lastUpdated: new Date().toISOString(),
    });

    res.status(200).send({ message: "Item removed from cart successfully!" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send({ error: "Failed to remove item from cart" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userid } = req.params;

    await db.collection("carts").doc(userid).delete();

    res.status(200).send({ message: "Cart cleared successfully!" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send({ error: "Failed to clear cart" });
  }
};
