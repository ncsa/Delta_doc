.. _vs-remote-ssh:

Remote SSH to Delta in VS Code
==================================

#. Install the **Remote - SSH** extension into VS Code.

   ..  figure:: ../images/prog_env/01_remote_ssh.png
       :alt: Remote ssh extension in VS Code.
       :figwidth: 550px
       :width: 500px

#. Follow the `VS Code connect to a remote host <https://code.visualstudio.com/docs/remote/ssh#_connect-to-a-remote-host>`_ instructions. 

   The following are Delta-specific examples and tips:

   - Continue to follow the guide to set up a remote connection to Delta.
     It helps if you have a local ``$HOME/.ssh/config`` with your commonly used hosts already present on the laptop and SSH client where you will be using VS Code. 
     Here is an example entry for Delta, change your username to your login name on Delta. VS Code will show hosts in your config in a pick list.

     **SSH config:**

     .. code-block:: terminal
   
        Host delta
                HostName login.delta.ncsa.illinois.edu
                User arnoldg
                ForwardX11 True
   - Once connected, you can work with the remote system as if it were local.
     When VS Code needs to install extension items on the remote system, it will go into your ``$HOME/.vscode-server`` on Delta. 
     VS Code takes care of all the details for you:

     **Remote server VS extensions:**

     .. code-block:: terminal
        [arnoldg@dt-login03 ~]$ du -sh .vscode-server/
        523M    .vscode-server/
        [arnoldg@dt-login03 ~]$ 
   
   - **Windows users**: The login box of VS Code will display your login as 2fa<delta_username>, and you may not see a 2nd login box for Duo 2fa until you click the **details** link at lower right after you enter your password. Use the Duo passcode when the next password prompt appears at the top.  Also see the `Visual Studio Code remote development troubleshooting <https://code.visualstudio.com/docs/remote/troubleshooting>`_ guide and search for "two-factor".

     \

   - If VS Code fails to connect after you have been using it for a while, check your quota (a full ``$HOME`` can prevent it from updating ``$HOME/.vscode`` on Delta). We have also seen cases where it was necessary to remove ``$HOME/.vscode`` on Delta similar the `VS Code documentation - clean uninstall <https://code.visualstudio.com/docs/setup/uninstall#_clean-uninstall>`_.

     Example of working with a C file remote on Delta:

     ..  image:: ../images/prog_env/02_remote_c_file.png
         :alt: Using VS Code to work with a C file on Delta.
         :width: 700

|
