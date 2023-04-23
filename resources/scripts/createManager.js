const createUser = async () => {
    const email = 'manager@crimsonclothing.com';
    const password = 'A123456!';
    const role = 'manager';
  
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });
  
      if (response.ok) {
        // handle successful user creation
      } else {
        // handle user creation error
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  createUser();
  