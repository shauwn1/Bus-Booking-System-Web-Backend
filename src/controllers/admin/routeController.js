const Route = require('../../models/admin/routeModel');

// Create a Route
exports.createRoute = async (req, res) => {
  const { routeId, startPoint, endPoint, distance, stops } = req.body;

  try {
    // Ensure `routeId` is unique
    const existingRoute = await Route.findOne({ routeId });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route ID already exists' });
    }

    const route = new Route({ routeId, startPoint, endPoint, distance, stops });
    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    console.error('Error creating route:', err);
    res.status(500).json({ message: 'Error creating route', error: err.message });
  }
};

// Get All Routes or Filter by Criteria
exports.getRoutes = async (req, res) => {
  const { startPoint, endPoint } = req.query;

  try {
    const query = {};
    if (startPoint) query.startPoint = startPoint;
    if (endPoint) query.endPoint = endPoint;

    const routes = await Route.find(query).select('routeId startPoint endPoint distance stops');
    res.status(200).json(routes);
  } catch (err) {
    console.error('Error fetching routes:', err);
    res.status(500).json({ message: 'Error fetching routes', error: err.message });
  }
};

// Update a Route
exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  const { startPoint, endPoint, distance, stops } = req.body;

  try {
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    if (startPoint) route.startPoint = startPoint;
    if (endPoint) route.endPoint = endPoint;
    if (distance) route.distance = distance;
    if (stops) route.stops = stops;

    const updatedRoute = await route.save();
    res.status(200).json(updatedRoute);
  } catch (err) {
    console.error('Error updating route:', err);
    res.status(500).json({ message: 'Error updating route', error: err.message });
  }
};
