<script setup lang="ts">
import { useUserStore } from '@/stores';
import { renderIcon } from '@/utils';
import { ElMessageBox } from 'element-plus';

defineOptions({ name: 'HeaderUser' });

const router = useRouter();

const userStore = useUserStore();

function handleSelect(val: string) {
  if (val === 'loginOut') {
    ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      userStore.removeToken();
      router.push('/login');
    });
  }
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleSelect">
    <el-avatar class="cursor-pointer" round src="https://avatars.githubusercontent.com/u/54931083?v=4" alt="头像" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :icon="renderIcon('icon-park-outline:user')"
          command="userCenter"
        >
          个人中心
        </el-dropdown-item>
        <el-dropdown-item
          :icon="renderIcon('teenyicons:password-outline')"
          command="editPassword"
          divided
        >
          修改密码
        </el-dropdown-item>
        <el-dropdown-item
          :icon="renderIcon('icon-park-outline:logout')"
          command="loginOut"
          divided
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
