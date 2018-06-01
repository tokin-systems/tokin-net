defmodule TOKIN do
  @moduledoc """
  Documentation for TOKIN.
  http://howistart.org/posts/elixir/1/
  """
  defstruct [:left, :right] 

  @doc """
  Starts transfer left -> right
  """
  def transfer(left, right, data) do
    for item <- data do
      TOKIN.Door.push(left, item)
    end
    %TOKIN{left: left, right: right}
  end

  @doc """
  Pushes data to the right in a given TOKIN
  """
  def push_right(tokin) do
    case TOKIN.Door.pop(tokin.left) do
      :error -> :ok
      {:ok, h} -> TOKIN.Door.push(tokin.right, h)
    end
    tokin
  end

  @doc """
  Shoots a new door with given color
  """
  def shoot(color) do
    Supervisor.start_child(TOKIN.Supervisor, [color])
  end

end

defimpl Inspect, for: TOKIN do
  def inspect(%TOKIN{left: left, right: right}, _) do
    left_door = inspect(left)
    right_door = inspect(right)

    left_data = inspect(Enum.reverse(TOKIN.Door.get(left)))
    right_data = inspect(TOKIN.Door.get(right))

    max = max(String.length(left_door), String.length(left_data))
    """
    #TOKIN<
      #{String.pad_leading(left_door, max)} <=> #{right_door}
      #{String.pad_leading(left_data, max)} <=> #{right_data}
    >
    """
  end
end