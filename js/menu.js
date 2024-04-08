fetchMenuItems=async()=> {
    try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        const menuItems = await response.json();
        displayMenuItems(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMenuItems();
});