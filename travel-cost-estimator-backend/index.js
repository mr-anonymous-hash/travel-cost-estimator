   const express = require('express');
  const app = express();
  const cors = require('cors');
  const path = require('path');
    
  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use('/api', require('./src/routes'));
  app.use('/image', express.static(path.join(__dirname, 'image')));
  
  // Error handling middleware
  const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
