const Route = require('../../models/admin/routeModel');

// Create a Route
// controllers/admin/routeController.js
exports.createRoute = async (req, res) => {
  const { routeId, startPoint, endPoint, distance, stops, prices } = req.body;

  try {
    // Validate if routeId is unique
    const existingRoute = await Route.findOne({ routeId });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route ID already exists' });
    }

    // Combine startPoint, endPoint, and stops into a single array of all points
    const allPoints = [startPoint, ...stops, endPoint];

    // Generate all possible pairs of stops for prices
    const requiredPrices = [];
    for (let i = 0; i < allPoints.length; i++) {
      for (let j = i + 1; j < allPoints.length; j++) {
        requiredPrices.push({
          from: allPoints[i],
          to: allPoints[j],
        });
      }
    }

    // Validate that all required prices are provided
    const missingPrices = requiredPrices.filter(
      (pair) => !prices.some((price) => price.from === pair.from && price.to === pair.to)
    );
    if (missingPrices.length > 0) {
      return res.status(400).json({
        message: 'Missing prices for some stop combinations',
        missingPrices,
      });
    }

    // Create and save the route
    const route = new Route({
      routeId,
      startPoint,
      endPoint,
      distance,
      stops,
      prices,
    });
    const savedRoute = await route.save();

    res.status(201).json(savedRoute);
  } catch (err) {
    console.error('Error creating route:', err);
    res.status(500).json({ message: 'Error creating route', error: err.message });
  }
};



// Get All Routes or Filter by Criteria
exports.getRoutes = async (req, res) => {
  const { startPoint, endPoint, sort } = req.query;

  try {
    const query = {};
    if (startPoint) query.startPoint = startPoint;
    if (endPoint) query.endPoint = endPoint;

    const routes = await Route.find(query)
      .select('routeId startPoint endPoint distance stops prices') // Include 'prices'
      .sort(sort || 'routeId');

    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching routes', error: err.message });
  }
};



// Update a Route
// controllers/admin/routeController.js
exports.updateRoute = async (req, res) => {
  const { id } = req.params; // This should be the routeId, not the ObjectId
  const { startPoint, endPoint, distance, stops, prices } = req.body;

  try {
    // Find the route by routeId instead of _id
    const route = await Route.findOne({ routeId: id });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Update route fields
    if (startPoint) route.startPoint = startPoint;
    if (endPoint) route.endPoint = endPoint;
    if (distance) route.distance = distance;
    if (stops) route.stops = stops;

    // Combine updated startPoint, endPoint, and stops into a single array
    const allPoints = [route.startPoint, ...(stops || route.stops), route.endPoint];

    // Generate all possible pairs of stops for prices
    const requiredPrices = [];
    for (let i = 0; i < allPoints.length; i++) {
      for (let j = i + 1; j < allPoints.length; j++) {
        requiredPrices.push({
          from: allPoints[i],
          to: allPoints[j],
        });
      }
    }

    // Validate that all required prices are provided
    if (prices) {
      const missingPrices = requiredPrices.filter(
        (pair) => !prices.some((price) => price.from === pair.from && price.to === pair.to)
      );
      if (missingPrices.length > 0) {
        return res.status(400).json({
          message: 'Missing prices for some stop combinations',
          missingPrices,
        });
      }

      // Update prices if provided
      route.prices = prices;
    }

    const updatedRoute = await route.save();
    res.status(200).json(updatedRoute);
  } catch (err) {
    console.error('Error updating route:', err);
    res.status(500).json({ message: 'Error updating route', error: err.message });
  }
};



// Delete a Route by routeId
exports.deleteRoute = async (req, res) => {
  const { id } = req.params; // id represents the routeId

  try {
    // Find the route by routeId
    const route = await Route.findOneAndDelete({ routeId: id });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.status(200).json({ message: 'Route deleted successfully', route });
  } catch (err) {
    console.error('Error deleting route:', err.message);
    res.status(500).json({ message: 'Error deleting route', error: err.message });
  }
};

