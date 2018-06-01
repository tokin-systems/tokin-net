defmodule TOKIN.Door do

    @doc """
    Starts door with certain color
    Color given as String name for bright id
    """

    def start_link(color) do
        Agent.start_link(fn -> [] end, name: color)
    end

    @doc """ 
    Get data in door 
    """

    def get(door) do
        Agent.get(door, fn list -> list end)
    end

    @doc """ 
    Pushes value into door 
    """

    def push(door,value) do
        Agent.update(door, fn list -> [value|list] end)
    end

    @doc """ 
    Removes Value from door
    """

    def pop(door) do
        Agent.get_and_update(door, fn 
        [] -> {:error, []}
        [h|t] -> {{:ok, h}, t}
        end)
    end
end