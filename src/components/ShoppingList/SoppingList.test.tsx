import { ShoppingList } from "./ShoppingList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ShoppingList Component", () => {
  it("Renders without crashing", () => {
    render(<ShoppingList />);
    const root = screen.getByTestId("shopping-list");
    expect(root).toBeInTheDocument();
  });

  it("Can add an item", async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText("Add item");
    const button = screen.getByText("Add");

    await userEvent.type(input, "Test item");
    await userEvent.click(button);

    expect(screen.getByText("Test item")).toBeInTheDocument();
  });

  it("Does not add empty item", async () => {
    render(<ShoppingList />);
    const button = screen.getByText("Add");

    await userEvent.click(button);

    const items = screen.queryAllByRole("listitem");

    expect(items.length).toBe(0);
  });

  it("Can delete an item", async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText("Add item");
    const addButton = screen.getByText("Add");

    await userEvent.type(input, "Item to delete");
    await userEvent.click(addButton);

    const deleteButton = screen.getByText("Delete");

    await userEvent.click(deleteButton);

    expect(screen.queryByText("Item to delete")).not.toBeInTheDocument();
  });

  it("Can delete all items", async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText("Add item");
    const addButton = screen.getByText("Add");
    const deleteAllButton = screen.getByText("Clear all");

    await userEvent.type(input, "First item to delete");
    await userEvent.click(addButton);

    await userEvent.type(input, "Second item to delete");
    await userEvent.click(addButton);

    expect(screen.queryAllByRole("listitem").length).toBe(2);

    await userEvent.click(deleteAllButton);

    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });

  it("Clears input after adding item", async () => {
    render(<ShoppingList />);

    const input = screen.getByPlaceholderText("Add item");
    const addButton = screen.getByText("Add");

    await userEvent.type(input, "Test item");
    await userEvent.click(addButton);

    expect(input).toHaveValue("");
  });
});
