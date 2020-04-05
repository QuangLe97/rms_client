
<template>

  <!--  <div>{{ $t('dashboard.content') }}</div>-->
  <v-container>
    <div class="container-fluid">
      <div class="main-container">
        <!--      tab-->
        <div class="row">
          <div
            class="col-3"
            style="background-color: #4CAF50;
                  color: white;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 12px 12px;
                  cursor: pointer;">tab 1
          </div>
          <div
            class="col-3"
            style="background-color: #4CAF50;
                  color: white;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 12px 12px;
                  cursor: pointer;">tab 1
          </div>
          <div
            class="col-3"
            style="background-color: #4CAF50;
                  color: white;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 12px 12px;
                  cursor: pointer;">tab 1
          </div>
        </div>
        <!--      name file-->
        <div style="text-align: center">
          <span style="text-align: center; font-size: 30px;color: #0e5814 ;font-weight: bold;">  BẢNG ĐÁNH GIÁ NĂNG LỰC</span>
        </div>
        <!--      nội dung công việc-->
        <div
          class="col-12"
          style="margin-top: 80px;padding: 0" >
          <!--          index -->
          <div class="row">
            <span style="color: black;font-size: 27px; font-weight: bold;">Nội dung công việc</span>
            <span
              class="iconify icon-action"
              data-icon="bx:bx-edit"/>

          <!--          <span class="main-container">icon</span>-->
          </div>
          <!--          key 1-->
          <div
            class="col-12"
            style="padding:0px">
            <span style="font-size: 25px;">Tên dự án</span>
            <br>
            <span style="font-size: 20px;">Dự án HRM</span>
          </div>
          <!--          key 2-->
          <div
            class="col-12"
          style="padding: 0px">
            <!--            style="margin-top: -20px">-->
            <span style="font-size: 25px;">Mô tả dự án</span><br>
            <span style="font-size: 20px;">Mô tả ABC12312313123</span>
          </div>
        </div>
        <!--        bảng tổng kết-->
        <div class="row">
          <span style="color: black;font-size: 30px; font-weight: bold;">Bảng tổng kết</span>
          <table style="width:100%">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>80</td>
            </tr>
          </table>
        </div>
        <!--        Nhận xét-->
        <div class="col">
          <div class="row">
            <span style="color: black;font-size: 30px; font-weight: bold;">Nhận xét</span>
            <span
              class="iconify icon-action"
              data-icon="bx:bx-edit"/>
          </div>
          <div class="col">
            <span style="font-size: 25px;">Tên dự án</span>
            <br>
            <span style="font-size: 20px;">Dự án HRM</span>
          </div>
          <div class="col">
            <span style="font-size: 25px;">Mô tả dự án</span><br>
            <span style="font-size: 20px;">Mô tả ABC12312313123</span>
          </div>
        </div>
        <!--          buttom-->
        <div style="margin-left: 100%">
          <button style="font-size: larger">
            Save
          </button>
        </div>

      </div>
    </div>
  </v-container>
</template>

<style lang="scss">
  /*@import '../scss/components/_icon.scss';*/
</style>
