.. _vs-remote-ssh:

Remote SSH to Delta Through VS Code
======================================

Follow the `Visual Studio Code remote development using SSH <https://code.visualstudio.com/docs/remote/ssh>`_ guide. A high-level overview with Delta-specific examples is provided in the following.

#. As stated in the guide, install **Remote - SSH** into VS Code:

   ..  image:: ../images/prog_env/01_remote_ssh.png
       :alt: remote ssh extension in visual studio
       :width: 500px

#. Continue to follow the guide to set up a remote connection to Delta.
   It helps if you have a local $HOME/.ssh/config with your commonly used hosts already present on the laptop and SSH client where you will be using Visual Studio. 
   Here is an example entry for Delta, change your username to your login name on Delta. Visual Studio will show hosts in your config in a pick list.

   **SSH config:**

   .. code-block:: terminal
   
      Host delta
              HostName login.delta.ncsa.illinois.edu
              User arnoldg
              ForwardX11 True

#. Once connected, you can work with the remote system as if it were local.
   When Visual Studio needs to install extension items on the remote system, it will go into your $HOME/.vscode-server on Delta. 
   Visual Studio takes care of all the details for you:

   **remote server VS extensions:**

   .. code-block:: terminal

      [arnoldg@dt-login03 ~]$ du -sh .vscode-server/
      523M    .vscode-server/
      [arnoldg@dt-login03 ~]$ 

#. Proceed to F1 → Remote SSH and connect to Delta. Then, following the guide, use Visual Studio as normal. 
   
   Windows users: The login box of vscode will display your login as 2fa<delta_username>, and you may not see a 2nd login box for 2fa Duo until you press the "details" link at lower right after you enter your password. Use the Duo passcode after pressing "details" link when the next password prompt appears at the top.  Also see the `Visual Studio Code remote development troubleshooting <https://code.visualstudio.com/docs/remote/troubleshooting>`_ guide and search for "two-factor".

   If VS Code fails to connect after you have been using it for a while, check your quota (a full $HOME can prevent it from updating $HOME/.vscode on Delta). We have also seen cases where it was necessary to remove $HOME/.vscode on Delta similar the `VS Code documentation - clean uninstall <https://code.visualstudio.com/docs/setup/uninstall#_clean-uninstall>`_.

   Example of working with a C file remote on Delta:

   ..  image:: ../images/prog_env/02_remote_c_file.png
       :alt: using visual studio to work with a C file on delta
       :width: 700
