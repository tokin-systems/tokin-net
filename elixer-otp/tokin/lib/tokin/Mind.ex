defmodule TOKIN.Neuron do
    defstruct pid: nil, input: 0, output: 0, incoming: [], outgoing: [], bias?: false, delta: 0
end

defmodule TOKIN.Connection do
    defstruct pid: nil, source: %{}, target: %{}, weight: 0.5
end

defmodule TOKIN.Layer do
    defstruct pid: nil, neurons: []
end

defmodule TOKIN.Network do
    defstruct pid: nil, input_layer: nil, output_layer: nil, hidden_layers: [], error: 0

    @doc """
  Neural Network Calls
  """
#   def start_link(neuron_fields \\ %{}) do
#     {:ok, pid} = Agent.start_link(fn -> %Neuron{} end)

#     {:ok, pid}
#   end

#   def update(pid, neuron_fields) do
#     Agent.update(pid, &(Map.merge(&1, neuron_fields)))
#   end
  
#   def update(pid) do
#     Agent.get(pid, &(&1))
#   end
end