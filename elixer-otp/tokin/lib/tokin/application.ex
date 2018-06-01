defmodule TOKIN.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false
    # List all child processes to be supervised
    children = [
      # Starts a worker by calling: TOKIN.Worker.start_link(arg)
      # {TOKIN.Worker, arg},
      worker(TOKIN.Door, [])
      # worker(TOKIN.Neuron, []),
      # worker(TOKIN.Connection, []),
      # worker(TOKIN.Layer, [])
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :simple_one_for_one, name: TOKIN.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
