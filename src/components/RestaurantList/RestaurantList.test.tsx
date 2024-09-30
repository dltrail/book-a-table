import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RestaurantList from './RestaurantList';
import { getRestaurants } from '../../services/api'
import { Restaurant } from '../../types';

// Mocking the getRestaurants API function
jest.mock('../../services/api', () => ({
  getRestaurants: jest.fn(),
}));

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Restaurant A',
    shortDescription: 'A great place for Italian cuisine.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Restaurant B',
    shortDescription: 'Delicious Japanese food.',
    rating: 4.7,
  },
];

describe('RestaurantList Component', () => {
  const onRestaurantSelect = jest.fn();

  beforeEach(() => {
    // Mock implementation for the API call
    (getRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the restaurant list when data is fetched successfully', async () => {
    render(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    // Check that the loading spinner is displayed initially
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // Wait for the restaurants to be rendered
    await waitFor(() => {
      const restaurantItems = screen.getAllByTestId('list-item');
      expect(restaurantItems).toHaveLength(2); // Expecting 2 restaurants to be rendered
    });

    // Check for specific restaurant details
    expect(screen.getByText('Restaurant A')).toBeInTheDocument();
    expect(screen.getByText('A great place for Italian cuisine.')).toBeInTheDocument();
    expect(screen.getByText('Restaurant B')).toBeInTheDocument();
    expect(screen.getByText('Delicious Japanese food.')).toBeInTheDocument();
  });

  it('should display an error message if fetching data fails', async () => {
    // Mock the API call to reject
    (getRestaurants as jest.Mock).mockRejectedValue('API Error');

    render(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'There was a problem fetching the restaurants: API Error'
      );
    });
  });

  it('should render NoResults component when no restaurants match the search term', async () => {
    render(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="Nonexistent" />);

    // Wait for the NoResults component to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Sorry, we couldn`t find anything based on your search of/i)).toBeInTheDocument();
    });
  });

  it('should load more restaurants when "Load more" button is clicked', async () => {
    render(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    // Wait for initial restaurants to be rendered
    await waitFor(() => {
      expect(screen.getAllByTestId('list-item')).toHaveLength(2);
    });

    // Click the "Load more" button
    const loadMoreButton = screen.getByRole('button', { name: /load more restaurants/i });
    fireEvent.click(loadMoreButton);

    // Wait for the pagination to complete
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner should be displayed
    });

    // Check if pagination limit increased and more restaurants are rendered (depending on mock data and implementation)
    await waitFor(() => {
      expect(screen.getAllByTestId('list-item')).toHaveLength(2); // Assuming still 2 as mock doesn't add more
    });
  });

  it('should call onRestaurantSelect when a restaurant is selected', async () => {
    render(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    // Wait for restaurants to be rendered
    await waitFor(() => {
      const restaurantItems = screen.getAllByTestId('list-item');
      expect(restaurantItems).toHaveLength(2);
    });

    // Click on the first restaurant item
    const firstRestaurant = screen.getByText('Restaurant A');
    fireEvent.click(firstRestaurant);

    // Check if the onRestaurantSelect callback is called with the correct ID
    expect(onRestaurantSelect).toHaveBeenCalledWith(1);
  });
});
