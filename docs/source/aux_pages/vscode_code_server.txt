We can run the code-server for vscode on Delta in manual mode (without
OpenOnDemand) following these steps:

#. Start the server.

   ::

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

   | 

#. Ssh to the login node where the server is waiting. Read the
   config.yaml noted above and copy the password to your clipboard.

   ::

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

      [arnoldg@dt-login03 ~]$ more ~/.config/code-server/config.yaml
      bind-addr: 127.0.0.1:8080
      auth: password
      password: 9e8081e80d9999c3c525fe26
      cert: false

   | 

#. Open a local browser on your desktop system with URL =
   http://127.0.0.1:8899 . Login with the password copied from above and
   begin using vscode in your browser.
