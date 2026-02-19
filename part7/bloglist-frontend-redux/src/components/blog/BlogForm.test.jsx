/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const onAddBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm onAddBlog={onAddBlog} />);

  const createNewBlogButton = container.querySelector(".show-button");

  await user.click(createNewBlogButton);

  const inputTitle = screen.getByPlaceholderText("Blog title");
  const inputAuthor = screen.getByPlaceholderText("Author");
  const inputURL = screen.getByPlaceholderText("Blog URL");
  const sendButton = screen.getByText("Create blog");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "testing a form...");
  await user.type(inputURL, "testing a form...");
  await user.click(sendButton);

  console.log("onAddBlog.mock.calls", onAddBlog.mock.calls);
  expect(onAddBlog.mock.calls).toHaveLength(1);
  expect(onAddBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(onAddBlog.mock.calls[0][0].author).toBe("testing a form...");
  expect(onAddBlog.mock.calls[0][0].url).toBe("testing a form...");
});
