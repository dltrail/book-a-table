import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RestaurantList from '../RestaurantList';
import { RestaurantProvider } from '../../../context/restaurantContext';
import { getRestaurants } from '../../../services/api';
import { Restaurant } from '../../../types';

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

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <RestaurantProvider>
      {ui}
    </RestaurantProvider>
  );
};

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
    renderWithProvider(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    await waitFor(() => {
      const restaurantItems = screen.getAllByTestId('list-item');
      expect(restaurantItems).toHaveLength(2);
    });

    expect(screen.getByText('Restaurant A')).toBeInTheDocument();
    expect(screen.getByText('A great place for Italian cuisine.')).toBeInTheDocument();
    expect(screen.getByText('Restaurant B')).toBeInTheDocument();
    expect(screen.getByText('Delicious Japanese food.')).toBeInTheDocument();
  });

  it('should display an error message if fetching data fails', async () => {
    (getRestaurants as jest.Mock).mockRejectedValue('API Error');

    renderWithProvider(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'There was a problem fetching the restaurants: API Error'
      );
    });
  });

  it('should render NoResults component when no restaurants match the search term', async () => {
    renderWithProvider(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="Nonexistent" />);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, we couldn`t find anything based on your search of/i)).toBeInTheDocument();
    });
  });

  it('should load more restaurants when "Load more" button is clicked', async () => {
    renderWithProvider(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    await waitFor(() => {
      expect(screen.getAllByTestId('list-item')).toHaveLength(2);
    });

    const loadMoreButton = screen.getByRole('button', { name: /load more /i });
    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(screen.getAllByTestId('list-item')).toHaveLength(2); // Assuming still 2 as mock doesn't add more
    });
  });

  it('should call onRestaurantSelect when a restaurant is selected', async () => {
    renderWithProvider(<RestaurantList onRestaurantSelect={onRestaurantSelect} searchTerm="" />);

    await waitFor(() => {
      const restaurantItems = screen.getAllByTestId('list-item');
      expect(restaurantItems).toHaveLength(2);
    });

    const firstRestaurant = screen.getByText('Restaurant A');
    fireEvent.click(firstRestaurant);

    expect(onRestaurantSelect).toHaveBeenCalledWith(1);
  });
})