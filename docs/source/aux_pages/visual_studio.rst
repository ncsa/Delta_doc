Remote - SSH
============

Follow: https://code.visualstudio.com/docs/remote/ssh

As stated in the guide, install "Remote - SSH" into Visual Studio:

Then continue to follow the guide to setup a remote connection to Delta.
It helps if you have a local $HOME/.ssh/config with your commonly used
hosts already present on the laptop and ssh client where you will be
using visual studio. Here's an example entry for Delta. Change your
username to your login name on Delta. Visual Studio will show hosts in
your config in a pick list.

::

   Host delta
           HostName login.delta.ncsa.illinois.edu
           User arnoldg
           ForwardX11 True

Once connected, you can work with the remote system as if it were local.
When Visual Studio needs to install extension items on the remote
system, they will go into your $HOME/.vscode-server on Delta. Visual
Studio takes care of all the details for you:

::

   [arnoldg@dt-login03 ~]$ du -sh .vscode-server/
   523M    .vscode-server/
   [arnoldg@dt-login03 ~]$ 

Proceed to F1 → Remote SSH and connect to Delta, then following the
guide, use Visual Studio as normal. This is an example of working with a
C file remote on Delta.

Remote Jupyter
==============

See:
https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server
and (open 2 new browser tabs).

Install the Jupyter extension for Visual Studio if you have not already
done so.

Complete the 1st step from the Delta User guide where you srun a
jupyter-notebook on a compute node. Make note of and copy the 1st URL
after the job is running. That is the URI you will provide to Visual
Studio's "Connect to a Remote Jupyter Server" after clicking the Kernels
button. You may also need to select the remote jupyter kernel under the
kernels in VScode.

| 

| 

| 
