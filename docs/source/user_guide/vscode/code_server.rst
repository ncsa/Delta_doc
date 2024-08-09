.. _code-server:

Run VS Code Code-Server in a Web Browser
==========================================

VS Code Code-Server can be run on Delta in manual mode (without Open OnDemand) by following these steps:

#. In a terminal, ``ssh`` log in to Delta (see :ref:`direct_access`).

#. Navigate to ``/sw/external/vscode/code-server/bin``.

#. Run the following command to start the server. Replace ``dt-loginNN`` with the login node you are logged in to.

   .. code-block:: terminal
      ./code-server --bind-addr dt-loginNN:8899
   In the following example, the user is logged in to ``dt-login03``:

   .. code-block::
   
      [arnoldg@dt-login03 bin]$  ./code-server --bind-addr 
      dt-login03:8899
      [2023-04-14T15:57:03.059Z] info  code-server 4.11.0 85e083580dec27ef19827ff42d3c9257d56ea7e3
      [2023-04-14T15:57:03.060Z] info  Using user-data-dir ~/.local/share/code-server
      [2023-04-14T15:57:03.132Z] info  Using config file ~/.config/code-server/config.yaml
      [2023-04-14T15:57:03.133Z] info  HTTP server listening on http://141.142.140.196:8899/
      [2023-04-14T15:57:03.133Z] info    - Authentication is enabled
      [2023-04-14T15:57:03.133Z] info      - Using password from ~/.config/code-server/config.yaml
      [2023-04-14T15:57:03.133Z] info    - Not serving HTTPS
      [10:57:12] 
#. Open a second terminal window.

#. In the second terminal, SSH tunnel to the login node running code-server with the following command. Replace:

   - ``username`` with your Delta login username (in one place).
   - ``dt-loginNN`` with the same login node you used in **step 3** (in **two** places).

   .. code-block:: terminal
      ssh -l username -L 127.0.0.1:8899:dt-loginNN.delta.ncsa.illinois.edu:8899 dt-loginNN.delta.ncsa.illinois.edu
   In the following example, the user is logged in to ``dt-login03``:

   .. code-block:: terminal 
      (base) galen@macbookair-m1-042020 ~ % ssh -l arnoldg -L 
      127.0.0.1:8899:dt-login03.delta.ncsa.illinois.edu:8899 dt-login03.delta.ncsa.illinois.edu
      ...
      Success. Logging you in...
      dt-login03.delta.internal.ncsa.edu (141.142.140.196)
        OS: RedHat 8.6   HW: HPE   CPU: 128x    RAM: 252 GB
            ΔΔΔΔΔ    ΔΔΔΔΔΔ   ΔΔ     ΔΔΔΔΔΔ   ΔΔ
            ΔΔ  ΔΔ   ΔΔ       ΔΔ       ΔΔ    ΔΔΔΔ
            ΔΔ  ΔΔ   ΔΔΔΔ     ΔΔ       ΔΔ   ΔΔ  ΔΔ
            ΔΔ  ΔΔ   ΔΔ       ΔΔ       ΔΔ   ΔΔΔΔΔΔ
            ΔΔΔΔΔ    ΔΔΔΔΔΔ   ΔΔΔΔΔΔ   ΔΔ   ΔΔ  ΔΔ
#. Read the ``config.yaml`` file noted when you started the server (**step 3**) and copy the **password** to your clipboard.

   .. code-block:: terminal
      more ~/.config/code-server/config.yaml
   Example output:

   .. code-block:: terminal
      [arnoldg@dt-login03 ~]$ more ~/.config/code-server/config.yaml
      bind-addr: 127.0.0.1:8080
      auth: password
      password: 9e8081e80d9999c3c525fe26  
      cert: false

#. Open a web browser on your local desktop/laptop and go to the following URL.

   .. code-block:: terminal
      http://127.0.0.1:8899

#. In the password field, enter the password you copied in **step 6** and begin using VS Code in your browser.

   ..  image:: ../images/prog_env/vscode_in_browser.png
       :alt: vscode in a web browser
       :width: 700
