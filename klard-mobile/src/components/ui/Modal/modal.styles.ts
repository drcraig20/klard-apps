import { StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { colors, spacing, borderRadius } from "@/constants/theme";

interface Styles {
  container: ViewStyle;
  overlay: ViewStyle;
  content: ViewStyle;
  handle: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  closeButton: ViewStyle;
  description: TextStyle;
  body: ViewStyle;
  footer: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    maxHeight: "90%",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.slate[300],
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.slate[900],
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: colors.slate[500],
    marginBottom: spacing.md,
  },
  body: {
    flex: 1,
  },
  footer: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.slate[200],
    marginTop: spacing.md,
  },
});
